import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <div>Главная</div>
            </Link>
          </li>
          <li>
            <Link href="/tags">
              <div>Теги</div>
            </Link>
          </li>
          <li>
            <Link href="/addVideo">
              <div>Добавить видео</div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
