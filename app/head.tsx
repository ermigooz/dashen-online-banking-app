export default function Head() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.embeddedChatbotConfig = {
              chatbotId: "e_Bz-nHLJzJWVM5wsvD2v",
              domain: "www.chatbase.co"
            }
          `,
        }}
      />
      <script src="https://www.chatbase.co/embed.min.js" defer chatbotId="e_Bz-nHLJzJWVM5wsvD2v"></script>
    </>
  )
}
