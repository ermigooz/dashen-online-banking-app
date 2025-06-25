export default function AmharaBankApp() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ color: "#0054A6" }}>Amhara Bank</h1>
        <p>Diaspora Banking Portal</p>
      </header>

      <main>
        <section
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h2>Welcome to Amhara Bank</h2>
          <p>Connecting the Ethiopian diaspora with innovative banking solutions.</p>
          <button
            style={{
              backgroundColor: "#0054A6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Learn More
          </button>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>Investment Opportunities</h3>
            <p>Explore exclusive investment options in Ethiopia.</p>
          </div>
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>Diaspora Services</h3>
            <p>Specialized banking solutions for Ethiopians abroad.</p>
          </div>
          <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>Foreign Exchange</h3>
            <p>Competitive rates for your currency exchange needs.</p>
          </div>
        </section>
      </main>

      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "20px",
          borderTop: "1px solid #ddd",
        }}
      >
        <p>© 2023 Amhara Bank. All rights reserved.</p>
      </footer>
    </div>
  )
}
