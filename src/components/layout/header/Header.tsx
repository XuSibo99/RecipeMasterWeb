type HeaderProps = {
title: string;
};

function Header({ title }: HeaderProps) {
    return (
    <div style={{ height: '60px', backgroundColor: 'transparent'}}>
        <h2>{title}</h2>
    </div>
    );
}

export default Header;