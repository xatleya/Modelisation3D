import numpy
import sys

# Détermine l'équation du plan défini par les points a, b et c, dans un tableau [a, b, c, d] tel que ax + by +cz + d = 0
def equationPlan(a, b, c):          
    ab = b-a
    ac = c-a
    vect = numpy.cross(ab,ac)
    eq = constantcaclcul(a, vect)
    return eq

# Calcule la constante d de l'équation d'un plan et renvoie l'équation complétée a la fonction equationPlan
def constantcaclcul(a, tab):
    d = 0
    for i in range(len(a)):
        d += (-a[i] * tab[i])
    tab = numpy.append(tab,d)
    return tab

# détermine l'équation d'une droite à partir de deux points. Résultat stockée dans un tableau [a, b, c] tel que by = ax + c
def eqdroite(a, b):
    y = 1
    if b[0]-a[0] != 0:
        if b[1]-a[1] == 0:
            m = 0
        else:
            m = (b[1]-a[1]) / (b[0]-a[0])
    else:
        y = 0
        m = 1
    p = a[1] * y - m * a[0]
    return [-m, y, -p]

# Renvoie True si le point appartient au même demi plan, délimité par 2 point du triangle, que le 3e point du même triangle 
def pointDemiPlan(a, b, eq):
    result1 = eq[0]*a[0] + eq[1]*a[1] + eq[2]
    result2 = eq[0] * b[0] + eq[1] * b[1] + eq[2]
    if result1 == 0:
        return True
    if (result1 > 0 and result2 > 0) or (result1 < 0 and result2 < 0):
        return True
    return False

# Renvoie True si un point est contenu dans un triangle (en 2D)
def pointTriangle(a, tab):
    cpt = 0
    for i in range(len(tab)):
        eq = eqdroite(tab[i%3], tab[(i+1)%3])
        newbool = pointDemiPlan(a, tab[(i+2)%3], eq)
        if not newbool:
            break
        cpt += 1
    if cpt == 3:
        return True
    return False

# renvoie True si un point est contenu dans le pan tab et renvoie l'équation de ce même plan
def pointPlan(a, tab):
    eq = equationPlan(tab[0], tab[1], tab[2])
    result = a[0]*eq[0] + a[1]*eq[1] + a[2]*eq[2] + eq[3]
    if result == 0:
        return True, eq
    return False, eq

# Fonction qui va appeler les autres fonctions pour tester si un point est dans la face triangulaire (3D)
def noeudSurface(a, tab):
    newtab = []
    newa = []
    for i in range(len(tab)):
        newtab.append([])
        newa.append(a[i])
        for j in tab[i]:
            newtab[i].append(j)
    mybool, eq = pointPlan(a, tab)
    if mybool:
        val = []
        for i in range(3):
            if eq[i] != 0:
                val.append(i)
        for i in range(len(newtab)):
            newtab[i].pop(val[0])
        newa.pop(val[0])
        mybool = pointTriangle(newa, newtab)
        if mybool:
            return True
    return False

# Fonction qui teste si un noeud et touché ou non par une contraintes
def noeuds(chaine, nodelist):
    cpt = 0
    tab = []
    for i in nodelist:
        if cpt >= len(chaine):
            break
        tab1 = i.split(" ")
        for j in chaine:
            tab2 = j.split(",")
            if tab1[1] == tab2[0] and tab1[2] == tab2[1] and tab1[3] == tab2[2]:
                tab.append(i)
                cpt += 1
    print(tab)

# Fonction qui va créer un tableau avec toutes les surfaces touchées par les contraintes 
def createTabSurface(chaine):
    tab = []
    for i in chaine:
        m = i.split("/")
        tab2 = []
        for j in m:
            p = j.split(",")
            tab1 = numpy.array([])
            for k in p:
                tab1 = numpy.append(tab1,float(k))
            tab2.append(tab1)
        tab.append(tab2)
    return tab


# Fonction qui teste si un noeud et touché par une contrainte sur une face triangulaire
def surfaces(chaine, nodelist):
    newchaine = createTabSurface(chaine)
    nodetab = []
    for i in nodelist:
        p = i.split(" ")
        m = numpy.array([])
        for j in range(1,4):
            m = numpy.append(m, float(p[j]))
        for k in newchaine:
            mybool = noeudSurface(m, k)
            if mybool:
                nodetab.append(i)
                break
    print(nodetab)

# Fonction permettant de lire le fichier texte contenant les informations sur les contraintes que subissent les géométries
def separation(filename):
    nodename = ""
    surfacename = ""
    fichier = open(filename, "r")
    chaine = fichier.read()
    chaine = chaine.split("\n")
    if chaine[0].__contains__("MeshFormat"):
        nodename = "Nodes"
    elif chaine[0].__contains__("Contraintes"):
        nodename = "Noeuds"
        surfacename = "Surfaces"
    mybool = False
    mybool2 = False
    nodeTab = []
    surfaceTab = []
    for i in chaine:
        if mybool and not i.__contains__(nodename):
            nodeTab.append(i)
        if i.__contains__(nodename):
            mybool = not mybool
        if surfacename != "":
            if mybool2 and not i.__contains__(surfacename):
                surfaceTab.append(i)
            if i.__contains__(surfacename):
                mybool2 = not mybool2
    return nodeTab, surfaceTab


def main():
    nodeconstraints, surfaceconstraints = separation(sys.argv[1])
    nodelist, unused = separation(sys.argv[2])
    nodelist.pop(0)
    noeuds(nodeconstraints, nodelist)
    surfaces(surfaceconstraints, nodelist)
    # a = numpy.array([50, -50, 50])
    # b = numpy.array([50, 50, -50])
    # c = numpy.array([50, -50, -50])
    # surf = [a, b, c]
    # m = numpy.array([50, -50, -50])
    # test = noeudSurface(m, surf)
    # print(test)



if __name__ == "__main__":
    main()