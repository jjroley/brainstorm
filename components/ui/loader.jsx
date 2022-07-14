import styles from '../../styles/Tools.module.css'

export default function Loader({ allPage }) {
  let c = styles.waiting;
  if (allPage === 'true') {
    c = styles.waiting + ' ' + styles.allPage
  }
  return (
    <ul className={c}>
      <li style={{'--i':1}}></li>
      <li style={{'--i':2}}></li>
      <li style={{'--i':3}}></li>
      <li style={{'--i':4}}></li>
      <li style={{'--i':5}}></li>
    </ul>
  );
}