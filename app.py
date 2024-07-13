from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Stocker les annonces validées
annonces = []

# Stocker les annonces en attente de validation
annonces_en_attente = []

@app.route('/')
def index():
    return render_template('index.html', annonces=annonces)

@app.route('/new', methods=['GET', 'POST'])
def new_annonce():
    if request.method == 'POST':
        titre = request.form['titre']
        description = request.form['description']
        annonces_en_attente.append({'titre': titre, 'description': description})
        return redirect(url_for('index'))
    return render_template('new.html')

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    global annonces, annonces_en_attente
    if request.method == 'POST':
        valider = request.form.getlist('valider')
        print(f"Annonces à valider : {valider}")  # Message de débogage
        for i in valider:
            annonces.append(annonces_en_attente[int(i)])
        annonces_en_attente = [annonce for i, annonce in enumerate(annonces_en_attente) if str(i) not in valider]
    print(f"Annonces en attente : {annonces_en_attente}")  # Message de débogage
    return render_template('admin.html', annonces_en_attente=annonces_en_attente)

if __name__ == '__main__':
    app.run(debug=True)
