import './Card.css';

export default function Card({ className = '', children, ...rest }) {
  const classes = ['card', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
