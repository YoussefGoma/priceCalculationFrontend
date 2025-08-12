<script setup lang="ts">
import type { DateValue } from "@internationalized/date"
import { today, DateFormatter, getLocalTimeZone } from "@internationalized/date"
import { ref, watch } from "vue"
import { format } from "date-fns"
import { usePriceCalculatorStore } from "@/stores/priceCalculator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-vue-next"

const store = usePriceCalculatorStore()

const numberOfWeeks = ref(1)
const startDate = ref<DateValue>(today(getLocalTimeZone()))
const numberOfWeeksError = ref("")

const df = new DateFormatter("en-US", { dateStyle: "long" })

watch(numberOfWeeks, (newVal) => {
  if (newVal <= 0) {
    numberOfWeeksError.value = "Number of weeks must be positive."
  } else if (newVal > 52) {
    numberOfWeeksError.value = "Number of weeks cannot exceed 52."
  } else {
    numberOfWeeksError.value = ""
  }
})

const handleSubmit = () => {
  if (numberOfWeeks.value <= 0) {
    numberOfWeeksError.value = "Number of weeks must be positive."
    return
  }
  store.calculatePrice({
    numberOfWeeks: numberOfWeeks.value,
    startDate: format(
      startDate.value!.toDate(getLocalTimeZone()),
      "yyyy-MM-dd"
    ),
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 p-4 border rounded-lg shadow-sm">
    <!-- Weeks Input -->
    <div class="space-y-2">
      <Label for="number-of-weeks">Number of Weeks</Label>
      <Input
        id="number-of-weeks"
        type="number"
        v-model.number="numberOfWeeks"
        :min="1"
        :max="52"
        :disabled="store.calculatingPrice"
      />
      <p v-if="numberOfWeeksError" class="text-red-500 text-sm">
        {{ numberOfWeeksError }}
      </p>
    </div>

    <!-- Date Picker -->
    <div class="space-y-2">
      <Label for="start-date">Start Date</Label>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            class="w-full justify-start"
            :disabled="store.calculatingPrice"
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            {{ startDate ? df.format(startDate.toDate(getLocalTimeZone())) : "Pick a date" }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar
            v-model="startDate"
            class="bg-white text-black"
            mode="single"
            initial-focus:true
            :min-value="today(getLocalTimeZone())"
          />
        </PopoverContent>
      </Popover>
    </div>

    <!-- Submit -->
    <Button type="submit" class="w-full bg-[#009994] text-white hover:bg-white hover:text-[#009994]" :disabled="store.calculatingPrice || !!numberOfWeeksError">
      {{ store.calculatingPrice ? "Calculating..." : "Calculate Price" }}
    </Button>
  </form>
</template>
