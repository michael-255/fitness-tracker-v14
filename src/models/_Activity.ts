import type { ActivityName, TextBlock } from '@/constants/types'
import type { ActivityObject } from '@/constants/interfaces'
import { _Entity } from '@/models/_Entity'
import { truncateString } from '@/utils/common'

/**
 * _Activity Class
 * @param obj ActivityObject
 */
export class _Activity extends _Entity {
  protected name: ActivityName
  protected description: TextBlock

  constructor({ id, createdAt, name = 'My Activity', description = null }: ActivityObject = {}) {
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
        field: (row: _Activity) => truncateString(row.getDescription() as string, 40),
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [..._Entity.getVisibleColumns(), 'name', 'description']
  }

  getName(): ActivityName {
    return this.name
  }

  getDescription(): TextBlock {
    return this.description
  }
}
