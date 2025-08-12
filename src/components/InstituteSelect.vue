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
    <label for="institute-select" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      Select Institute
    </label>
    <Select v-model="store.selectedInstituteId" :disabled="store.loadingInstitutes || store.institutes.length === 0">
      <SelectTrigger class="w-full">
        <SelectValue placeholder="Select an institute" />
      </SelectTrigger>
      <SelectContent class="bg-white text-black">
        <SelectGroup>
          <SelectItem
            v-for="institute in store.institutes"
            class="hover:bg-[#009994] hover:text-white cursor-pointer"
            :key="institute.id"
            :value="institute.id"
          >
            {{ institute.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <p v-if="store.loadingInstitutes" class="text-sm text-gray-500">Loading institutes...</p>
    <p v-else-if="store.institutes.length === 0" class="text-sm text-gray-500">No institutes available.</p>
  </div>
</template>
