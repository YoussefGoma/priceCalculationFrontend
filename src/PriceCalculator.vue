<script setup>
import { onMounted, watch } from 'vue';
import { usePriceCalculatorStore } from '@/stores/priceCalculator';
import InstituteSelect from '@/components/InstituteSelect.vue';
import CourseSelect from '@/components/CourseSelect.vue';
import PriceForm from '@/components/PriceForm.vue';
import PriceBreakdown from '@/components/PriceBreakdown.vue';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const store = usePriceCalculatorStore();

onMounted(() => {
  store.fetchInstitutes();
});

watch(() => store.selectedInstituteId, (newVal) => {
  store.fetchCourses(newVal);
});
</script>

<template>
  <div class="container mx-auto p-4 max-w-2xl">
    <h1 class="text-3xl font-bold mb-6 text-center text-emerald-600">Price Calculator</h1>

    <Alert v-if="store.error" variant="destructive" class="mb-4">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{{ store.error }}</AlertDescription>
    </Alert>

    <div class="grid grid-cols-1 gap-6">
      <InstituteSelect
        v-model:selectedInstituteId="store.selectedInstituteId"
        :institutes="store.institutes"
        :loading="store.loadingInstitutes"
      />

      <CourseSelect
        v-model:selectedCourseId="store.selectedCourseId"
        :courses="store.courses"
        :loading="store.loadingCourses"
        :disabled="!store.selectedInstituteId || store.courses.length === 0"
      />

      <p v-if="!store.loadingCourses && store.selectedInstituteId && store.courses.length === 0" class="text-sm text-gray-500">
        No courses available for this institute.
      </p>

      <PriceForm
        v-if="store.selectedCourseId"
        @calculate="store.calculatePrice"
        :calculating="store.calculatingPrice"
      />

      <PriceBreakdown
        v-if="store.priceBreakdown"
        :breakdown="store.priceBreakdown"
      />
    </div>
  </div>
</template>
