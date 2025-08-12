<script setup>
import { usePriceCalculatorStore } from '@/stores/priceCalculator';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const store = usePriceCalculatorStore();
</script>

<template>
  <div class="space-y-2">
    <label for="course-select" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      Select Course
    </label>
    <Select v-model="store.selectedCourseId" :disabled="!store.selectedInstituteId || store.loadingCourses || store.courses.length === 0">
      <SelectTrigger class="w-full">
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectContent class="bg-white text-black">
        <SelectGroup>
          <SelectItem
            v-for="course in store.courses"
            class="hover:bg-[#009994] hover:text-white cursor-pointer"
            :key="course.id"
            :value="course.id"
          >
            {{ course.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <p v-if="store.loadingCourses" class="text-sm text-gray-500">Loading courses...</p>
  </div>
</template>
