import fs from 'fs'
import { resolve } from 'path'

const isProjectPage = ({ path }) =>
  path && path.indexOf('/projects/') >= 0 && path !== '/projects/'

export default function generateFeed(pages) {
  // Copy over all video files from the directories
  pages.filter(isProjectPage).forEach(({ path }) => {
    const files = fs.readdirSync(resolve(__dirname, `../../pages/${path}`))
    const videos = files.filter(file => file.indexOf('.webm') !== -1)
    videos.forEach((video) => {
      const pieces = video.split('/')
      const name = pieces.pop()
      const src = resolve(__dirname, `../../pages/${path}/${name}`)
      const dest = resolve(__dirname, `../../public/${path}/${name}`)
      fs.createReadStream(src).pipe(fs.createWriteStream(dest))
    })
  })
}
