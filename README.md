# Perfume-Scraper

Nodejs web scraper for creating perfumes database

---

### Database Schema

**BrandSchema**({
name: String,
description: String,
country: String,
url: String,
logo: String,
perfumes: [{
type: Schema.Types.ObjectId,
ref: "Perfume"
}]
})

**PerfumeSchema**({
name: String,
description: String,
sex: String,
rating: mongoose.Types.Decimal128,
votes: Number,
pictures: [ String ]
notes: [
top_notes: [ String ],
middle_notes: [ String ],
base_notes: [ String ]
],
brand: {
type: Schema.Types.ObjectId,
ref: "Brand"
}
})
