<script setup lang="ts">
import { DBTable, DialogType } from '@/constants/enums'
import DataTable from './DataTable.vue'
import { useTabContent } from '@/use/useTabContent'
import FullscreenDialog from '@/components/dialogs/FullscreenDialog.vue'
import MeasurementInputs from '@/components/input_groups/MeasurementInputs.vue'
import MeasurementRecordInputs from '@/components/input_groups/MeasurementRecordInputs.vue'

const props = defineProps<{
  table: DBTable
}>()

const {
  tableRows,
  dialog,
  dialogType,
  detailsItem,
  updateDialog,
  onCreate,
  onReport,
  onDetails,
  onEdit,
  onDelete,
  onClear,
  onSaved,
} = useTabContent(props.table)

function isNotReportOrDetails(): boolean {
  return dialogType.value !== DialogType.DETAILS && dialogType.value !== DialogType.REPORT
}
</script>

<template>
  <DataTable
    :table="table"
    :rows="tableRows"
    @on-create="onCreate()"
    @on-clear="onClear()"
    @on-report="onReport($event)"
    @on-details="onDetails($event)"
    @on-edit="onEdit($event)"
    @on-delete="onDelete($event)"
  />

  <FullscreenDialog
    :table="table"
    :dialog="dialog"
    :dialogType="dialogType"
    @update:dialog="updateDialog($event)"
    @on-save="onSaved()"
  >
    <div v-if="dialogType === DialogType.DETAILS">
      <div v-for="(value, key, i) in detailsItem" :key="i">
        <div class="q-mb-sm">
          <div class="text-subtitle1 text-weight-bold">{{ key }}</div>
          <div>{{ value || '-' }}</div>
        </div>
      </div>
    </div>

    <MeasurementInputs v-if="table === DBTable.MEASUREMENTS && isNotReportOrDetails()" />
    <MeasurementRecordInputs
      v-if="table === DBTable.MEASUREMENT_RECORDS && isNotReportOrDetails()"
    />
  </FullscreenDialog>
</template>
