<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { Icon, DBTable, LogLevel } from '@/constants/enums'
import { database } from '@/services/LocalDatabase'
import { useAppLogger } from '@/use/useAppLogger'
import type { Exercise } from '@/models/Exercise'

const table = DBTable.EXERCISES

const tableRows: Ref<Exercise[]> = ref([])

const { silentLog } = useAppLogger()

onMounted(async () => {
  updateTableRows()
})

async function updateTableRows(): Promise<void> {
  try {
    tableRows.value = await database.getAll(table)
  } catch (error) {
    silentLog({ error, level: LogLevel.ERROR, name: 'updateTableRows', details: table })
  }
}

const tableColumns: any[] = [
  {
    name: 'id',
    label: 'Id',
    align: 'left',
    required: true,
    field: (row: any) => row.id,
    sortable: true,
  },
  {
    name: 'createdAt',
    label: 'Created At',
    align: 'left',
    required: true,
    field: (row: any) => row.createdAt,
    sortable: true,
  },
]

function test(val: any) {
  console.log(val)
}
</script>

<template>
  <QTable
    :rows="tableRows"
    :columns="tableColumns"
    :rows-per-page-options="[0]"
    virtual-scroll
    style="height: 80vh"
  >
    <!-- Table Heading -->
    <template v-slot:top>
      <div class="q-table__title text-weight-bold">Measurement Records</div>
      <QSpace />
      <div>
        <QBtn color="positive" label="Create" class="q-mr-sm" />
        <QBtn color="negative" label="Clear" />
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
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="primary"
            @click="test(props.cols[0].value)"
            :icon="Icon.REPORT"
          />
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="info"
            @click="test(props.cols[0].value)"
            :icon="Icon.DETAILS"
          />
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="warning"
            @click="test(props.cols[0].value)"
            :icon="Icon.EDIT"
          />
          <QBtn
            flat
            round
            dense
            class="q-ml-xs"
            color="negative"
            @click="test(props.cols[0].value)"
            :icon="Icon.DELETE"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>
</template>
