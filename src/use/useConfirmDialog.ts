/**
 * Customizable Quasar confirm dialog function.
 * @param $quasar QVueGlobals ($q)
 * @example
 * import { useQuasar } from 'quasar'
 * const $q = useQuasar()
 * const { confirmDialog } = useConfirmDialog($q)
 */
export function useConfirmDialog($quasar: any) {
  function confirmDialog(title: string, message: string, onOkFunc: () => void) {
    $quasar
      .dialog({
        title,
        message,
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        onOkFunc()
      })
  }

  return {
    confirmDialog,
  }
}
