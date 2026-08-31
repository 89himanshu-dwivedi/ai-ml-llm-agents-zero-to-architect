# Daily Workflow

Everything you need for the day-to-day loop. Copy/paste friendly.

## 0. One-time (already done for this repo)

```powershell
gh repo clone 89himanshu-dwivedi/<repo-name>
cd <repo-name>
```

## 1. Every day — start

```powershell
git pull --rebase          # get anything you pushed from another machine
git switch -c day-<yyyy-mm-dd>   # optional: work on a branch
```

## 2. Edit

Add or change files. Then update:
- the topic folder's `NOTES.md`
- the **Progress log** table in `README.md` (one row per day)

## 3. Save your work

```powershell
git status                 # see what changed
git add .
git commit -m "day 12: binary search patterns + 3 problems"
git push                   # first push on a new branch: git push -u origin HEAD
```

## 4. If you used a branch — merge it

```powershell
gh pr create --fill        # opens a PR
gh pr merge --squash --delete-branch
git switch main
git pull
```

Working straight on `main` is fine for a solo learning repo — just commit and push.

## 5. Deploy (GitHub Pages)

The `docs/` folder is published automatically. Edit `docs/index.html`, commit, push — the site updates in ~1 minute at:

```
https://89himanshu-dwivedi.github.io/<repo-name>/
```

Check a deployment:

```powershell
gh run list --limit 5
gh browse
```

## 6. Common fixes

| Problem | Fix |
|---|---|
| Committed the wrong message | `git commit --amend -m "new message"` (only before pushing) |
| Want to undo last commit, keep files | `git reset --soft HEAD~1` |
| Discard local changes to one file | `git restore path/to/file` |
| Push rejected (remote ahead) | `git pull --rebase` then `git push` |
| Accidentally committed a secret | Rotate the secret first, then rewrite history |
| See what changed | `git diff` / `git log --oneline -10` |

## 7. Creating a NEW repo in future

```powershell
gh repo create <name> --public --clone --description "..."
cd <name>
# add README.md, .gitignore, docs/index.html
git add . ; git commit -m "chore: initial scaffold" ; git push -u origin main
gh api -X POST repos/89himanshu-dwivedi/<name>/pages -f "source[branch]=main" -f "source[path]=/docs"
```
