export function useDialog($q: any) {
  function dialog() {
    $q.dialog({
      title: 'Confirm',
      message: 'Would you like to confirm?',
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        console.log('OK')
      })
      .onCancel(() => {
        console.log('Cancel')
      })
  }

  return {
    dialog,
  }
}
