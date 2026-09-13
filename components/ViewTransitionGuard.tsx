// Chrome skips view transitions when the document is hidden — both when one
// starts in a hidden tab and when the tab is hidden mid-transition — and
// rejects `ready` with InvalidStateError "Transition was aborted because of
// invalid state. Document hidden". React silences the legacy message without
// the suffix, but newer Chrome appends the reason, so the mismatch surfaces
// as uncaught errors in the console (facebook/react#34098, fixed upstream in
// react-dom by ignoring generic InvalidStateError).
//
// This inline script runs before React boots and:
//  1. While the document is hidden, replaces `startViewTransition` with a
//     version that runs the DOM update directly and resolves immediately.
//  2. Otherwise delegates to the native API, but re-maps benign visibility
//     aborts to the exact legacy message React recognizes (and resolves them
//     for `finished`), so React treats them as the skips they are.
const GUARD_CODE = `(function () {
  if (
    typeof document === 'undefined' ||
    typeof document.startViewTransition !== 'function'
  ) {
    return
  }
  var LEGACY_SKIP_MESSAGE = 'Transition was aborted because of invalid state'
  var startViewTransition = document.startViewTransition.bind(document)

  function isBenignAbort(error) {
    return (
      error != null &&
      error.name === 'InvalidStateError' &&
      typeof error.message === 'string' &&
      error.message.lastIndexOf(LEGACY_SKIP_MESSAGE, 0) === 0
    )
  }

  function soften(promise, resolveBenign) {
    return promise.then(undefined, function (error) {
      if (isBenignAbort(error)) {
        if (resolveBenign) {
          return undefined
        }
        throw new DOMException(LEGACY_SKIP_MESSAGE, 'InvalidStateError')
      }
      throw error
    })
  }

  document.startViewTransition = function (options) {
    if (document.visibilityState === 'hidden') {
      var update =
        typeof options === 'function' ? options : options && options.update
      var updateCallbackDone = Promise.resolve().then(function () {
        return update ? update() : undefined
      })
      var settled = updateCallbackDone.then(
        function () {},
        function () {}
      )
      return {
        ready: settled,
        updateCallbackDone: updateCallbackDone,
        finished: settled,
        skipTransition: function () {},
      }
    }
    var transition = startViewTransition(options)
    return {
      updateCallbackDone: soften(transition.updateCallbackDone, false),
      ready: soften(transition.ready, false),
      finished: soften(transition.finished, true),
      skipTransition: function () {
        transition.skipTransition()
      },
    }
  }
})()`

export default function ViewTransitionGuard() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: GUARD_CODE }}
      suppressHydrationWarning
    />
  )
}
