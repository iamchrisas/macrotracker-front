import React from "react";

function HomePage() {
  return (
    <div className="home-page glass-effect bg-gray-100">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">Macrotracker</h1>
      </header>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-4xl mx-auto p-4">
          <main>
            <section className="text-lg space-y-4">
              <ul className="list-disc space-y-2 pl-5">
                <li>Want to lose weight or gain muscle?</li>
                <li>You're not alone.</li>
                <li>Sticking to a diet often brings anxiety and guilt.</li>
                <li>
                  Close the gap between your goals and your habits, stress-free.
                </li>
              </ul>
              <p style={{ display:"flex" ,marginTop: "80px", justifyContent: "center" }}>
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
