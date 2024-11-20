import React from 'react';
import { redirect } from 'next/navigation'; // Doğru yönlendirme modülünü kullan
import { prisma } from '../../db';

async function createTodo(data: FormData) {
    'use server';

    const title = data.get('title');
    if (!title || typeof title !== 'string') {
        throw new Error('Title is required');
    }

    await prisma.todo.create({ data: { title } });
    redirect('/todos'); // Başarılı olursa yönlendirme yap
}

export default function NewTodoPage() {
    return (
        <form action={createTodo} className="p-6 flex flex-col gap-4">
            <label htmlFor="title">Title</label>
            <input
                name="title"
                className="bg-gray-200 py-2 px-2 rounded"
                placeholder="Title"
                type="text"
                id="title"

            />
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                Create
            </button>
        </form>
    );
}
