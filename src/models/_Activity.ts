import { ActivityStatus } from '@/constants/enums'
import type { Nullable } from '@/constants/globals'
import { _Entity, type EntityParams } from '@/models/_Entity'
import { truncateString } from '@/utils/common'

export interface ActivityParams extends EntityParams {
  name?: string
  description?: Nullable<string>
  status?: ActivityStatus
}

/**
 * _Activity Class
 * @param obj Partial<ActivityParams>
 */
export class _Activity extends _Entity {
  public name: string
  public description: Nullable<string>
  public status: ActivityStatus

  constructor({
    id,
    createdAt,
    name = 'My Activity',
    description = null,
    status = ActivityStatus.ENABLED,
  }: Partial<ActivityParams> = {}) {
    super({ id, createdAt })
    this.name = name
    this.description = description
    this.status = status
  }

  static getTableColumns(): any[] {
    return [
      ..._Entity.getTableColumns(),
      {
        name: 'name',
        label: 'Name',
        align: 'left',
        field: (row: _Activity) => row.name,
        sortable: true,
      },
      {
        name: 'description',
        label: 'Description',
        align: 'left',
        field: (row: _Activity) => truncateString(row.description, 40),
        sortable: true,
      },
      {
        name: 'status',
        label: 'Status',
        align: 'left',
        field: (row: _Activity) => row.status,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Entity.getVisibleColumns(), 'name', 'description']
  }
}
