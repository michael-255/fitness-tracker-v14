/**
 * Customizable Quasar simple dialog.
 * @param $quasar QVueGlobals ($q)
 * @example
 * import { useQuasar } from 'quasar'
 * const $q = useQuasar()
 * const { confirmDialog, dismissDialog } = useSimpleDialogs($q)
 */
export function useSimpleDialogs($quasar: any) {
  function confirmDialog(title: string, message: string, onOkFunc: () => any): void {
    $quasar
      .dialog({
        title,
        message,
        cancel: true,
      })
      .onOk(() => {
        onOkFunc()
      })
  }

  function dismissDialog(title: string, message: string): void {
    $quasar.dialog({
      title,
      message,
      cancel: false,
    })
  }

  return {
    confirmDialog,
    dismissDialog,
  }
}
