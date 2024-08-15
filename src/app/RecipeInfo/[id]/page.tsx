"use client"

export default function Recipe({ params }: { params: { id: string } }) {
    const { id } = params
    return (
        <div>
            <h1>Recipe: {id}</h1>
        </div>
    )
}