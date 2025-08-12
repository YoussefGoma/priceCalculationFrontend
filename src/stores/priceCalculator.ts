import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import axios from 'axios'

interface Institute {
  id: number
  name: string
}

interface Course {
  id: number
  name: string
}

interface PriceBreakdown {
  base_total: number
  total_discount: number
  discounts: { name: string; amount: number; type: string; based_on: string }[]
  total_fees: number
  fees: { name: string; amount: number; type: string; based_on: string }[]
  final_total: number
}

interface CalculateForm {
  numberOfWeeks: number
  startDate: string
}

export const usePriceCalculatorStore = defineStore('priceCalculator', () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
  const api = axios.create({
    baseURL: API_BASE_URL,
  })

  const institutes = ref<Institute[]>([])
  const selectedInstituteId = ref<number | null>(null)
  const courses = ref<Course[]>([])
  const selectedCourseId = ref<number | null>(null)
  const priceBreakdown = ref<PriceBreakdown | null>(null)
  const error = ref<string | null>(null)
  const loadingInstitutes = ref(false)
  const loadingCourses = ref(false)
  const calculatingPrice = ref(false)

  const fetchInstitutes = async () => {
    loadingInstitutes.value = true
    error.value = null
    try {
      const response = await api.get<{ data: Institute[] }>('/institutes')
      institutes.value = response.data.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch institutes.'
      console.error('Error fetching institutes:', err)
    } finally {
      loadingInstitutes.value = false
    }
  }

  const fetchCourses = async (instituteId: number | null) => {
    loadingCourses.value = true
    error.value = null
    courses.value = []
    selectedCourseId.value = null
    if (!instituteId) {
      loadingCourses.value = false
      return
    }
    try {
      const response = await api.get<{ data: Course[] }>(`/institutes/${instituteId}/courses`)
      courses.value = response.data.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch courses.'
      console.error('Error fetching courses:', err)
    } finally {
      loadingCourses.value = false
    }
  }

  const calculatePrice = async (formData: CalculateForm) => {
    calculatingPrice.value = true
    error.value = null
    priceBreakdown.value = null
    try {
      const response = await api.post<{ data: PriceBreakdown }>('/calculate-price', {
        course_id: selectedCourseId.value,
        number_of_weeks: formData.numberOfWeeks,
        start_date: formData.startDate,
      })
      priceBreakdown.value = response.data.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to calculate price.'
      console.error('Error calculating price:', err)
    } finally {
      calculatingPrice.value = false
    }
  }

  // Automatically fetch courses when institute changes
  watch(selectedInstituteId, (newVal) => {
    fetchCourses(newVal)
  })

  return {
    institutes,
    selectedInstituteId,
    courses,
    selectedCourseId,
    priceBreakdown,
    error,
    loadingInstitutes,
    loadingCourses,
    calculatingPrice,
    fetchInstitutes,
    fetchCourses,
    calculatePrice,
  }
})
