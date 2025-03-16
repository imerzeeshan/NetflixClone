import './index.css'

const FailureView = props => {
  const {retry} = props
  const retryButton = () => {
    retry()
  }

  return (
    <div style={{textAlign: `center`}}>
      <img
        className="failure-alert-img"
        src="https://res.cloudinary.com/dxauytfko/image/upload/v1741550168/alert-triangle_s3u5uy.png"
        alt="failure view"
      />
      <p className="failure-msg">Something went wrong. Please try again</p>
      <button className="failure-retry-btn" onClick={retryButton} type="button">
        Try Again
      </button>
    </div>
  )
}

export default FailureView
