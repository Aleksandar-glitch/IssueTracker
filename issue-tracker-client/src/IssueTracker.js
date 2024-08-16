import React, { useState, useEffect } from 'react'
import axios from 'axios'

const apiUrl = 'http://localhost:3001/issues'

const IssueTracker = () => {
    const [issues, setIssues] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [editing, setEditing] = useState(false)
    const [currentIssue, setCurrentIssue] = useState(null)

    useEffect(() => {
        fetchIssues()
    }, [])

    const fetchIssues = async () => {
        const response = await axios.get(apiUrl)
        setIssues(response.data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editing) {
            await axios.put(`${apiUrl}/${currentIssue.id}`, {title, description})
        } else {
            await axios.post(apiUrl, {title, description})
        }
        setTitle('')
        setDescription('')
        setEditing(false)
        setCurrentIssue(null)
        fetchIssues()
    }

    const handleEdit = (issue) => {
        setTitle(issue.title)
        setDescription(issue.description)
        setEditing(true)
        setCurrentIssue(issue)
    }

    const handleDelete = async (id) => {
        await axios.delete(`${apiUrl}/${id}`)
        fetchIssues()
    }

    return (
        <div>
            <h1>Issue Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">{editing ? 'Update' : 'add'}</button>
            </form>
            <ul>
                {issues.map(issue => (
                    <li key={issue.id}>
                        <h2>{issue.title}</h2>
                        <p>{issue.description}</p>
                        <button onClick={() => handleEdit(issue)}>Edit</button>
                        <button onClick={() => handleDelete(issue.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )

}


export default IssueTracker