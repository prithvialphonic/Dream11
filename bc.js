 carouselHandle(val) {
    let imageArray= []
    let barArray= []
    val.forEach((image, i)=> {
        const thisImage = (
                <TouchableHighlight>
                <Image
                  resizeMode= 'cover'
                  key={i}
                  source={{uri: image.imageUrl}}
                  style={{ width: '50%', height: '100%' }} />
                 
                 </TouchableHighlight>
        )
        imageArray.push(thisImage)

          const scrollBarVal = this.state.animVal.interpolate({
              inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
              outputRange: [-this.state.itemWidth, this.state.itemWidth],
              extrapolate: 'clamp',
          })

          const thisBar = (
              <View key= {'bar${i}'} style= {[styles.track, {
                  width: this.state.itemWidth, marginLeft: i === 0 ? 0: 10,
              },]}>

              <Animated.View
                      style= {[
                          styles.bar,
                          {
                              width: this.state.itemWidth,
                              transform: [
                              {translateX: scrollBarVal},],
                          },]} />
                          </View>
          )
          barArray.push(thisBar)
      })

      this.setState({
          imageArray: imageArray,
          barArray: barArray
      })
    }