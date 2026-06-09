const PageWrapper = (props) => {
  const className = props.className || ''

  return (
    <main className={`min-h-screen fade-in ${className}`}>
      {props.children}
    </main>
  )
}

export default PageWrapper
