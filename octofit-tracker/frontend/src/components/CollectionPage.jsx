import useCollection from './useCollection.js'

export default function CollectionPage({ resource, endpoint, title, description, columns }) {
  const { records, loading, error, refresh } = useCollection(endpoint)

  return (
    <section aria-labelledby={`${resource}-title`}>
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">OctoFit / Tracker data</p>
          <h1 id={`${resource}-title`}>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="record-count" aria-live="polite">
          <strong>{loading ? '...' : records.length}</strong>
          <span>{records.length === 1 ? 'record' : 'records'}</span>
        </div>
      </div>

      <section className="collection-panel" aria-label={`${title} collection`}>
        <div className="collection-toolbar">
          <div className="collection-state" data-state={error ? 'error' : loading ? 'loading' : 'ready'}>
            <span className="online-mark" aria-hidden="true" />
            <span>{error ? 'Connection issue' : loading ? 'Loading collection' : 'Collection loaded'}</span>
          </div>
          <button className="refresh-button" disabled={loading} onClick={refresh} type="button">
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state" role="status">Loading {title.toLowerCase()}...</div>
        ) : error ? (
          <div className="error-state" role="alert">
            <strong>Could not load this collection</strong>
            <p>{error}</p>
            <button className="refresh-button" onClick={refresh} type="button">Try again</button>
          </div>
        ) : records.length === 0 ? (
          <div className="empty-state">No {title.toLowerCase()} to show yet.</div>
        ) : (
          <div className="table-wrap">
            <table className="collection-table">
              <thead>
                <tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id || record.id || `${resource}-${index}`}>
                    {columns.map((column) => <td key={column.key}>{column.render(record, index)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  )
}