# Honda Lab website

GitHub Pages: https://ktmryo1.github.io/honda-lab/

| Page | URL |
| --- | --- |
| Top / link-in-bio | https://ktmryo1.github.io/honda-lab/ |
| Affiliate picks (PR) | https://ktmryo1.github.io/honda-lab/picks.html |
| Affiliate disclosure | https://ktmryo1.github.io/honda-lab/disclosure.html |
| Contact | https://ktmryo1.github.io/honda-lab/contact.html |
| Data deletion | https://ktmryo1.github.io/honda-lab/data-deletion.html |
| TikTok app page | https://ktmryo1.github.io/honda-lab/Tiktok/ |
| Terms of Service | https://ktmryo1.github.io/honda-lab/Tiktok/terms.html |
| Privacy Policy | https://ktmryo1.github.io/honda-lab/Tiktok/privacy.html |
| OAuth redirect | https://ktmryo1.github.io/honda-lab/callback/ |

## Adding picks

`picks.json` is regenerated automatically by おすすめ商品スタジオ (`C:\AI_Tools\affiliate_introduction`,
`app/server/src/services/site-picks.ts`) on startup and after every successful publish, then committed and
pushed. Manual edits to `items` are overwritten. Item format:

```json
{ "title": "商品名", "url": "https://...", "image": "https://...", "shop": "ショップ名", "price": 1980, "date": "2026-10-14" }
```

To stop the auto-update, set `honda_lab_sync` = `false` in the studio settings table.

## TikTok URL verification

Put the verification file downloaded from TikTok "URL properties" into the `Tiktok/` folder and push.
