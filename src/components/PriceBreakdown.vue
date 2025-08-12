<script setup>
import { usePriceCalculatorStore } from '@/stores/priceCalculator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const store = usePriceCalculatorStore();
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Price Breakdown</CardTitle>
      <CardDescription>Details of your calculated price.</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">Base Total:</span>
        <span class="text-lg font-bold">${{ store.priceBreakdown.base_total.toFixed(2) }}</span>
      </div>

      <div v-if="store.priceBreakdown.discounts && store.priceBreakdown.discounts.length > 0">
        <h3 class="text-md font-medium mb-2">Discounts:</h3>
        <ul class="space-y-1">
          <li v-for="(discount, index) in store.priceBreakdown.discounts" :key="index" class="flex justify-between text-sm text-gray-600">
            <span>{{ discount.name }} ({{ discount.type }}):</span>
            <span class="text-red-500">-${{ discount.amount.toFixed(2) }}</span>
          </li>
        </ul>
        <div class="flex justify-between items-center mt-2">
          <span class="text-md font-medium">Total Discount:</span>
          <span class="text-red-500 font-bold">-${{ store.priceBreakdown.total_discount.toFixed(2) }}</span>
        </div>
      </div>

      <div v-if="store.priceBreakdown.fees && store.priceBreakdown.fees.length > 0">
        <h3 class="text-md font-medium mb-2">Additional Fees:</h3>
        <ul class="space-y-1">
          <li v-for="(fee, index) in store.priceBreakdown.fees" :key="index" class="flex justify-between text-sm text-gray-600">
            <span>{{ fee.name }} ({{ fee.type }}):</span>
            <span class="text-green-600">+${{ fee.amount.toFixed(2) }}</span>
          </li>
        </ul>
        <div class="flex justify-between items-center mt-2">
          <span class="text-md font-medium">Total Fees:</span>
          <span class="text-green-600 font-bold">+${{ store.priceBreakdown.total_fees.toFixed(2) }}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-between items-center pt-4 border-t">
      <span class="text-xl font-semibold">Final Total:</span>
      <span class="text-3xl font-extrabold text-emerald-500">${{ store.priceBreakdown.final_total.toFixed(2) }}</span>
    </CardFooter>
  </Card>
</template>
