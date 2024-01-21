import { beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

var users = {
    data: [
        {
            id: 1,
            first_name: 'Ivan',
            last_name: 'Moroz',
            phone: '123456789'
        }
    ]
}

var validationErrors = {
    errors: {
        first_name: [
            'The first name field is required.'
        ],
    }
}

export const requestHandlers = [
    http.get('/api/users', () => {
        return HttpResponse.json(users, { status: 200 });
    }),

    http.post('/api/users', async () => {
        const { first_name, last_name, phone } = {first_name: '', last_name: '', phone: ''}
        if (first_name == '' || last_name == '' || phone == '') {
            return HttpResponse.json(validationErrors,{ status: 422 });
        }
        users.data.push({
            id: users.data.length + 1,
            first_name: first_name,
            last_name: last_name,
            phone: phone
        })
        return HttpResponse.json(users, { status: 200 });
    }),

    http.put('/api/users/:user', async () => {
        const { first_name, last_name, phone } = {first_name: '', last_name: '', phone: ''}
        if (first_name == '' || last_name == '' || phone == '') {
            return HttpResponse.json(validationErrors,{ status: 422 });
        }
        users.data[0].first_name = first_name
        users.data[0].last_name = last_name
        users.data[0].phone = phone
        return HttpResponse.json(users, { status: 200 });
    }),

    http.delete('/api/users/:user', async () => {
        users.data.shift()
        return HttpResponse.json(users, { status: 200 });
    }),
]

const server = setupServer(...requestHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())
