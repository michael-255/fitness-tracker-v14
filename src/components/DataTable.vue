<script setup lang="ts">
import { QSelect, QInput, QIcon } from 'quasar'
import { Icon, DBTable } from '@/constants/enums'
import { type Ref, ref, onMounted } from 'vue'
import { useTable } from '@/use/useTable'

const props = defineProps<{
  table: DBTable
  rows: any[]
}>()

const emits = defineEmits<{
  (event: 'on-create'): void
  (event: 'on-clear'): void
  (event: 'on-report', id: string): void
  (event: 'on-details', id: string): void
  (event: 'on-edit', id: string): void
  (event: 'on-delete', id: string): void
}>()

const {
  isActivityTable,
  getTableLabel,
  getTableColumns,
  getTableColumnOptions,
  getTableVisibleColumns,
} = useTable()
const searchFilter: Ref<string> = ref('')
const visibleColumns: Ref<string[]> = ref([])

onMounted(async () => {
  visibleColumns.value = getTableVisibleColumns(props.table)
})

function canReport(): boolean {
  return isActivityTable(props.table)
}

function canEdit(): boolean {
  return props.table !== DBTable.APP_LOGS
}

function canCreate(): boolean {
  return props.table !== DBTable.APP_LOGS
}

async function onCreate(): Promise<void> {
  emits('on-create')
}

async function onClear(): Promise<void> {
  emits('on-clear')
}

async function onReport(id: string): Promise<void> {
  emits('on-report', id)
}

async function onDetails(id: string): Promise<void> {
  emits('on-details', id)
}

async function onEdit(id: string): Promise<void> {
  emits('on-edit', id)
}

async function onDelete(id: string): Promise<void> {
  emits('on-delete', id)
}
</script>

<template>
  <QTable
    :rows="rows"
    :columns="getTableColumns(props.table)"
    :rows-per-page-options="[0]"
    virtual-scroll
    style="height: 85vh"
    row-key="id"
    :visible-columns="visibleColumns"
    :filter="searchFilter"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">{{ getTableLabel(props.table) }}</div>
      <QSpace />
      <!-- Search Input -->
      <QInput
        outlined
        dense
        debounce="300"
        v-model="searchFilter"
        placeholder="Search"
        class="q-mr-sm q-mb-sm"
      >
        <template v-slot:append>
          <QIcon name="search" />
        </template>
      </QInput>
      <!-- Column Select -->
      <QSelect
        v-model="visibleColumns"
        multiple
        outlined
        dense
        options-dense
        display-value="Columns"
        emit-value
        map-options
        :options="getTableColumnOptions(props.table)"
        option-value="name"
        options-cover
        style="min-width: 150px"
        class="q-mr-sm q-mb-sm"
      />
      <div>
        <!-- Create Btn -->
        <QBtn
          v-if="canCreate()"
          color="positive"
          label="Create"
          class="q-mr-sm q-mb-sm"
          @click="onCreate()"
        />
        <!-- Clear Btn -->
        <QBtn color="negative" label="Clear" @click="onClear()" class="q-mb-sm" />
      </div>
    </template>
    <!-- Column Headers -->
    <template v-slot:header="props">
      <QTr :props="props">
        <QTh v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </QTh>
        <QTh auto-width />
      </QTr>
    </template>
    <!-- Rows -->
    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </QTd>
        <QTd auto-width>
          <!-- Report Btn -->
          <QBtn
            v-if="canReport()"
            flat
            round
            dense
            class="q-ml-xs"
            color="accent"
            @click="onReport(props.cols[0].value)"
            :icon="Icon.REPORT"
          />
          <!-- Details Btn -->
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            @click="onDetails(props.cols[0].value)"
            :icon="Icon.DETAILS"
          />
          <!-- Edit Btn -->
          <QBtn
            v-if="canEdit()"
            flat
            round
            dense
            class="q-ml-xs"
            color="orange-9"
            @click="onEdit(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <!-- Delete Btn -->
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="onDelete(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>
</template>
