import { _Entity, type IEntity } from '@/models/_Entity'
import type { ActivityStatus } from '@/constants/enums'
import { truncateString } from '@/utils/common'

export interface IActivity extends IEntity {
  name: string
  description: string
  activityStatus: ActivityStatus
}

/**
 * _Activity Class
 * @param params IActivity
 */
export class _Activity extends _Entity {
  name: string
  description: string
  activityStatus: ActivityStatus

  constructor(params: IActivity) {
    super({ id: params.id, createdAt: params.createdAt })
    this.name = params.name
    this.description = params.description
    this.activityStatus = params.activityStatus
  }

  static getTableColumns(): any[] {
    return [
      ..._Entity.getTableColumns(),
      {
        name: 'name',
        label: 'Name',
        align: 'left',
        field: (row: _Activity) => row.name,
        format: (val: string) => truncateString(val),
        sortable: true,
      },
      {
        name: 'description',
        label: 'Description',
        align: 'left',
        field: (row: _Activity) => row.description,
        format: (val: string) => truncateString(val),
        sortable: true,
      },
      {
        name: 'activityStatus',
        label: 'Status',
        align: 'left',
        field: (row: _Activity) => row.activityStatus,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Entity.getVisibleColumns(), 'name']
  }
}
