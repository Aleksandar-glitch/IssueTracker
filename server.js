const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())

let issues = [
    { id: 1, title: 'Issue 1', description: 'Description of Issue 1'},
    { id: 2, title: 'Issue 2', description: 'Description of Issue 2'}
]

// Read all issues
app.get('/issues', (req, res) => {
    res.json(issues)
})


// Read a single issue by id
app.get('/issues/:id', (req, res) => {
    const issue = issues.find(i => i.id == req.params.id)
    if (issue) {
        res.json(issue)
    } else {
        res.status(404).send('Issue not found')
    }
})

// Create a new issue
app.post('/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length ? issues[issues.length - 1].id + 1 : 1;
    issues.push(newIssue)
    console.log('Created:', newIssue)
    res.status(201).json(newIssue)
})

// Update an issue
app.put('/issues/:id', (req, res) => {
    const issueIndex = issues.findIndex(i => i.id == req.params.id)
    if (issueIndex >= 0) {
        issues[issueIndex] = { ...issues[issueIndex], ...req.body}
        console.log('Updated: ', issues[issueIndex])
        res.json(issues[issueIndex])
    } else {
        res.status(404).send('Issue not found')
    }
})

// Delete an issue
app.delete('/issues/:id', (req, res) => {
    const issueIndex = issues.findIndex(i => i.id == req.params.id)
    if (issueIndex >= 0) {
        const deletedIssue = issues.splice(issueIndex, 1)
        console.log('Deleted: ', deletedIssue[0])
        res.status(204).send()
    } else {
        res.status(404).send('Issue not found')
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

module.exports = app