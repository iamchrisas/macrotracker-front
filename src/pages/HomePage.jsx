import React from "react";

function HomePage() {
  return (
    <div className="home-page glass-effect bg-gray-100">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold mb-2">Macrotracker</h1>
        <h2>
          <i>Get your summer body one meal at a time</i>
        </h2>
      </header>
      <div className="flex flex-col justify-center items-center mt-0">
        <div className="max-w-4xl mx-auto">
          <main>
            <section className="text-lg space-y-2">
              <ul className="list-disc space-y-1 pl-5">
                <li>Need to lose weight or gain muscle?</li>
                <li>You don't have to feel anxiety or guilt.</li>
                <li>
                  Close the gap between your goals and your habits, stress-free.
                </li>
              </ul>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  marginTop: "30px",
                  height: "0",
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    border: "0",
                  }}
                  src="https://www.tella.tv/video/cluh8dwlb012m0fidfq1qhz9z/embed?b=0&title=0&a=0&loop=0&autoPlay=true&t=0&muted=1&wt=0"
                  allowFullScreen
                  allowTransparency
                ></iframe>
              </div>
              <p
                style={{
                  display: "flex",
                  marginTop: "15px",
                  padding: "20px",
                  justifyContent: "center",
                }}
              >
                Made by Chrisas
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
