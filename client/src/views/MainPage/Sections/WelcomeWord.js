import React from "react";
import Texty from 'rc-texty';
import './WelcomeWord.css';
import TweenOne from 'rc-tween-one';

class WelcomeWord extends React.Component {
  state = {
    show: true,
  }
  geInterval = (e) => {
    switch (e.index) {
      case 0:
        return 0;
      case 1:
        return 150;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 150 + 450 + (e.index - 2) * 10;
      default:
        return 150 + 450 + (e.index - 6) * 150;
    }
  }
  getEnter = (e) => {
    const t = {
      opacity: 0,
      scale: 0.8,
      y: '-100%',
    };
    if (e.index >= 2 && e.index <= 6) {
      return { ...t, y: '-30%', duration: 150 };
    }
    return t;
  }

  getSplit = (e) => {
    const t = e.split(' ');
    const c = [];
    t.forEach((str, i) => {
      c.push((
        <span key={`${str}-${i}`}>
          {str}
        </span>
      ));
      if (i < t.length - 1) {
        c.push(<span key={` -${i}`}> </span>);
      }
    });
    return c;
  }

  componentDidMount() {
    this.setState({
      show: false,
    }, () => {
      this.setState({
        show: true
      });
    });
  }

  render() {
    return (
      <div className="combined-wrapper">
        {this.state.show && (
          <div className="combined">
            <div className="combined-shape">
              <div className="shape-left">
                <TweenOne
                  animation={[
                    { x: 400, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                    { x: -400, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                  ]}
                />
              </div>
              <div className="shape-right">
                <TweenOne
                  animation={[
                    { x: -400, type: 'from', ease: 'easeInOutQuint', duration: 600 },
                    { x: 400, ease: 'easeInOutQuart', duration: 450, delay: -150 },
                  ]}
                />
              </div>
            </div>
            <Texty
              className="title"
              type="mask-top"
              delay={400}
              enter={this.getEnter}
              interval={this.geInterval}
              component={TweenOne}
              componentProps={{
                animation: [
                  { x: 10, type: 'set' },
                  { x: 0, delay: -100, duration: 1000 },
                  {
                    ease: 'easeOutQuart',
                    duration: 200,
                    x: 0,
                  },
                  {
                    letterSpacing: 0,
                    delay: 300,
                    scale: 0.9,
                    ease: 'easeInOutQuint',
                    duration: 1000,
                  },
                  { scale: 1, width: '100%', delay: 300, duration: 1000, ease: 'easeInOutQuint' },
                ],
              }}
            >
              Welcome to Chambana!
            </Texty>
            <TweenOne
              className="combined-bar"
              animation={{ delay: 2000, width: 0, x: 0, type: 'from' }}
            />
            <Texty
              className="content"
              type="bounce"
              split={this.getSplit}
              delay={2500}
              interval={50}
            >
              Feel free to find your activities and houses.
            </Texty>
          </div>
        )}
      </div>
    );
  }
}

export default WelcomeWord;
