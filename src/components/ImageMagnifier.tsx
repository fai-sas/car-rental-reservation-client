import { useRef, useEffect } from 'react'

const ImageMagnifier = ({ src, width, height, zoom }) => {
  const imgRef = useRef(null)
  const glassRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    const glass = glassRef.current
    const bw = 3
    const w = glass.offsetWidth / 2
    const h = glass.offsetHeight / 2

    glass.style.backgroundImage = `url('${src}')`
    glass.style.backgroundRepeat = 'no-repeat'
    glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`

    const moveMagnifier = (e) => {
      e.preventDefault()
      const pos = getCursorPos(e)
      let x = pos.x
      let y = pos.y

      if (x > img.width - w / zoom) {
        x = img.width - w / zoom
      }
      if (x < w / zoom) {
        x = w / zoom
      }
      if (y > img.height - h / zoom) {
        y = img.height - h / zoom
      }
      if (y < h / zoom) {
        y = h / zoom
      }

      glass.style.left = `${x - w}px`
      glass.style.top = `${y - h}px`
      glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${
        y * zoom - h + bw
      }px`
    }

    const getCursorPos = (e) => {
      const a = img.getBoundingClientRect()
      const x = e.pageX - a.left - window.pageXOffset
      const y = e.pageY - a.top - window.pageYOffset
      return { x, y }
    }

    img.addEventListener('mousemove', moveMagnifier)
    glass.addEventListener('mousemove', moveMagnifier)
    img.addEventListener('touchmove', moveMagnifier)
    glass.addEventListener('touchmove', moveMagnifier)

    return () => {
      img.removeEventListener('mousemove', moveMagnifier)
      glass.removeEventListener('mousemove', moveMagnifier)
      img.removeEventListener('touchmove', moveMagnifier)
      glass.removeEventListener('touchmove', moveMagnifier)
    }
  }, [src, zoom])

  return (
    <>
      <div className='img-magnifier-container ' style={{ width, height }}>
        <img
          className='flex items-center justify-center mx-auto rounded-md '
          ref={imgRef}
          src={src}
          alt='Product'
          style={{ width, height }}
        />
        <div ref={glassRef} className='img-magnifier-glass' />
        {/* <div ref={glassRef} className='img-magnifier-glass' /> */}
      </div>
    </>
  )
}

export default ImageMagnifier
