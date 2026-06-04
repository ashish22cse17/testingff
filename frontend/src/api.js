const BASE = 'https://testingff.onrender.com/api'

function token() {
  return localStorage.getItem('galaxy_token') || ''
}

function headers() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }
}

async function req(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  register: (body) => req('POST', '/auth/register', body),
  login:    (body) => req('POST', '/auth/login', body),

  getMe:         ()     => req('GET',   '/users/me'),
  getAllUsers:    ()     => req('GET',   '/users'),
  getUser:       (id)   => req('GET',   `/users/${id}`),
  updateGalaxy:  (body) => req('PATCH', '/users/me/galaxy', body),

  getFriends:      ()     => req('GET',    '/friends'),
  sendRequest:     (id)   => req('POST',   `/friends/request/${id}`),
  acceptRequest:   (id)   => req('PATCH',  `/friends/accept/${id}`),
  removeFriend:    (id)   => req('DELETE', `/friends/${id}`),

  getComments:    (tid)         => req('GET',    `/comments/${tid}`),
  postComment:    (tid, body)   => req('POST',   `/comments/${tid}`, body),
  deleteComment:  (cid)         => req('DELETE', `/comments/${cid}`),
}
