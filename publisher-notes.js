import axios from 'axios'

export default {
    loadPublisherNotes: (params, success, failure) => axios.get(
        '/publisher_notes/load-publisher-notes/',
        {
            params
        }
    ).then(success).catch(failure),
    
    createPublisherNote: (payload, success, failure) => axios.post(
        '/publisher_notes/create-publisher-note/',
        payload
    ).then(success).catch(failure),
    
    updatePublisherNote: (payload, success, failure) => axios.put(
        `/publisher_notes/${payload.id}/edit/`,
        payload
    ).then(success).catch(failure),
    
    deletePublisherNote: (id, success, failure) => axios.delete(
        `/publisher_notes/${id}/delete/`,
    ).then(success).catch(failure)
}