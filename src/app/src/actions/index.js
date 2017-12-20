import 'whatwg-fetch'
import { getServerAddress } from '../utilities'

export const addPane = () => {
  return {
    type: 'ADD_PANE'
  }
}

export const removePane = () => {
  return {
    type: 'REMOVE_PANE'
  }
}

export const loadDashboardsAndSetCurrent = (nameOrId) => async (dispatch) => {
  const uri = `${getServerAddress()}/api/dashboards`
  const response = await fetch(uri)
  const available = await response.json()
  dispatch({
    type: 'LOAD_AVAILABLE',
    available
  })

  if (nameOrId) {
    const current = available.find(x => x._id === nameOrId || x.name === nameOrId)
    if (current) dispatch(setCurrent(current))
  }
}

export const setCurrent = (current) => {
  return {
    type: 'SET_CURRENT',
    current
  }
}

export const addNewDashboard = (dashboard) => async (dispatch) => {
  const uri = `${getServerAddress()}/api/dashboards`
  const response = await fetch(uri, {
    method: 'POST',
    body: JSON.stringify(dashboard),
    headers: { 'Content-Type': 'application/json' }
  })

  if (response.status >= 200 && response.status < 300) {
    dispatch(loadDashboardsAndSetCurrent())
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}