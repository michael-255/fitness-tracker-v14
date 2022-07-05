<script setup lang="ts">
import { Measurement } from '@/models/Measurement'

const inputKeys = Object.keys(new Measurement())
/*
 * @param obj.id (Inherited)
 * @param obj.createdAt (Inherited)
 * @param obj.name (Inherited)
 * @param obj.description (Inherited)
 * @param obj.status (Inherited)
 * @param obj.trackLbs
 * @param obj.trackInches
 * @param obj.trackFeet
 * @param obj.trackPercent
 */
</script>

<template>
  <div v-for="key in inputKeys" :key="key">
    <div v-if="key == 'id'">Key: {{ key }}</div>
    <div v-if="key == 'createdAt'">Key: {{ key }}</div>
    <div v-if="key == 'name'">Key: {{ key }}</div>
    <div v-if="key == 'description'">Key: {{ key }}</div>
    <div v-if="key == 'status'">Key: {{ key }}</div>
    <div v-if="key == 'trackLbs'">Key: {{ key }}</div>
    <div v-if="key == 'trackInches'">Key: {{ key }}</div>
    <div v-if="key == 'trackFeet'">Key: {{ key }}</div>
    <div v-if="key == 'trackPercent'">Key: {{ key }}</div>
  </div>
</template>
