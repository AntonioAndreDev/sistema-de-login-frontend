export default function Footer() {
  return (
    <footer className="mt-12 text-center font-medium">
      <h1>
        Desenvolvido por{" "}
        <span className="underline italic cursor-pointer">
          <a href="https://aadev.com.br" target="_blank" rel="noopener noreferrer">
            Antônio André
          </a>
        </span>
      </h1>
      <a
        href="https://github.com/AntonioAndreDev/sistema-de-login-frontend"
        target="_blank"
        rel="noopener noreferrer"
        className="italic underline cursor-pointer text-sm font-normal"
      >
        Confira a documentação do projeto
      </a>
    </footer>
  );
}
