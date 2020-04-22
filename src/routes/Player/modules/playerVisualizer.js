import butterchurnPresets from 'butterchurn-presets'
import {
  PLAYER_CMD_NEXT,
  PLAYER_CMD_OPTIONS,
} from 'shared/actionTypes'

const _presetKeys = Object.keys(butterchurnPresets.getPresets())

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PLAYER_CMD_NEXT]: (state, { payload }) => ({
    ...state,
    ...getRandomPreset(),
  }),
  [PLAYER_CMD_OPTIONS]: (state, { payload }) => {
    const { visualizer } = payload
    if (typeof visualizer !== 'object') return state

    let preset = {}

    if (visualizer.nextPreset || visualizer.prevPreset) {
      const curIdx = _presetKeys.indexOf(state.presetKey)
      const nextIdx = curIdx === _presetKeys.length - 1 ? 0 : curIdx + 1 // wrap around
      const prevIdx = curIdx === 0 ? _presetKeys.length - 1 : curIdx - 1 // wrap around

      preset = getPreset(visualizer.nextPreset ? nextIdx : visualizer.prevPreset ? prevIdx : curIdx)
    } else if (visualizer.randomPreset) {
      preset = getRandomPreset()
    }

    return {
      ...state,
      ...preset,
      isEnabled: typeof visualizer.isEnabled === 'boolean' ? visualizer.isEnabled : state.isEnabled,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isEnabled: false,
  isSupported: isWebGLSupported(),
  ...getRandomPreset(),
}

export default function playerVisualizer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

function getPreset (i) {
  return {
    presetKey: _presetKeys[i],
    presetName: `[${i + 1}/${_presetKeys.length}] ` + _presetKeys[i],
  }
}

function getRandomPreset () {
  return getPreset(Math.floor(Math.random() * (_presetKeys.length - 1)))
}

function isWebGLSupported () {
  try {
    return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('webgl')
  } catch (e) {
    return false
  }
}
