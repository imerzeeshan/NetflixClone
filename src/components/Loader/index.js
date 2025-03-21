import Loader from 'react-loader-spinner'

const Spinner = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
  </div>
)

export default Spinner
