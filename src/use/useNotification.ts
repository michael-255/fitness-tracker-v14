export function useNotify($q: any) {
  function notify() {
    $q.notify({
      color: 'secondary',
      textColor: 'white',
      icon: 'event',
      message: 'You have confirmed the operation. Good job!',
      caption: `${new Date()}`,
      actions: [
        {
          label: 'Dismiss',
          color: 'white',
        },
      ],
    })
  }

  return {
    notify,
  }
}
