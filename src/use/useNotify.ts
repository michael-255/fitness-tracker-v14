import { Icon } from '@/constants/enums'

/**
 * Customizable Quasar notification function.
 * @param $quasar QVueGlobals ($q)
 * @example
 * import { useQuasar } from 'quasar'
 * const $q = useQuasar()
 * const { notify } = useNotify($q)
 */
export function useNotify($quasar: any) {
  function notify(
    message: string,
    icon: Icon = Icon.INFO,
    color: 'light-blue' | 'orange-9' | 'negative' = 'light-blue',
    textColor = 'white'
  ) {
    $quasar.notify({
      message,
      icon,
      color,
      textColor,
      actions: [
        {
          label: 'Dismiss',
          color: textColor,
        },
      ],
    })
  }

  return {
    notify,
  }
}
