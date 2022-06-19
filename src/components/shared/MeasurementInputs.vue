<script setup lang="ts">
import { Measurement } from '@/models/Measurement'

const inputKeys = Object.keys(new Measurement())
/*
 * @arg obj.id (Inherited)
 * @arg obj.createdAt (Inherited)
 * @arg obj.name (Inherited)
 * @arg obj.description (Inherited)
 * @arg obj.status (Inherited)
 * @arg obj.trackLbs
 * @arg obj.trackInches
 * @arg obj.trackFeet
 * @arg obj.trackPercent
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
