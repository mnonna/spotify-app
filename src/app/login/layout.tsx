export default function LoginLayout({ children }) {
  return (
    <section className="pageWrapper grid">
      <div className="pageWrapper__main w-full flex justify-center">
        { children }
      </div>
    </section>
  );
}