import type { Nullable } from '@/constants/types'
import { _Entity, type EntityParams } from '@/models/_Entity'
import { truncateString } from '@/utils/common'

export interface ActivityParams extends EntityParams {
  name?: string
  description?: Nullable<string>
}

/**
 * _Activity Class
 * @param obj Partial<ActivityParams>
 */
export class _Activity extends _Entity {
  protected name: string
  protected description: Nullable<string>

  constructor({
    id,
    createdAt,
    name = 'My Activity',
    description = null,
  }: Partial<ActivityParams> = {}) {
    super({ id, createdAt })
    this.name = name
    this.description = description
  }

  static getTableColumns(): any[] {
    return [
      ..._Entity.getTableColumns(),
      {
        name: 'name',
        label: 'Name',
        align: 'left',
        field: (row: _Activity) => row.getName(),
        sortable: true,
      },
      {
        name: 'description',
        label: 'Description',
        align: 'left',
        field: (row: _Activity) => truncateString(row.getDescription(), 40),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Entity.getVisibleColumns(), 'name', 'description']
  }

  getName(): string {
    return this.name
  }

  getDescription(): Nullable<string> {
    return this.description
  }
}
