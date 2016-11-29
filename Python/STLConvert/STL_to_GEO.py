import sys
import os

def stl_to_geo_name(filename):
    path, new_filename = os.path.split(filename)
    new_filename = new_filename[0:-4]
    new_filename += ".geo"
    return new_filename


class Point:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

        self.number = 0

    def set_number(self, number):
        self.number = number

    def get_number(self):
        return self.number

    def __eq__(self, other):
        if self.x == other.x and self.y == other.y and self.z == other.z:
            return True
        else:
            return False

    def display(self):
        filename = stl_to_geo_name(sys.argv[1])
        string = "Point({}) = {{{}, {}, {}, lc}};\n".format(self.number, self.x, self.y, self.z)
        by = string.encode(encoding='UTF-8')
        with open(filename, "ab") as f:
            f.write(by)
        #print("Point({}) = {{{}, {}, {}, lc}};".format(self.number, self.x, self.y, self.z))

class Line:
    def __init__(self, p1, p2):
        self.p1 = p1
        self.p2 = p2
        self.number = 0

    def __eq__(self, other):
        if self.p1 == other.p1 and self.p2 == other.p2:
            return True
        elif self.p1 == other.p2 and self.p2 == other.p1:
            return True
        else:
            return False

    def display(self):
        filename = stl_to_geo_name(sys.argv[1])
        string = "Line({}) = {{{}, {}}};\n".format(self.number, self.p1, self.p2)
        by = string.encode(encoding='UTF-8')
        with open(filename, "ab") as f:
            f.write(by)
        #print("Line({}) = {{{}, {}}};".format(self.number, self.p1, self.p2))

class Face:
    def __init__(self,  number):
        self.lines = []
        self.number = number

    def display(self):
        str = "Line Loop({}) = {{".format(self.number)
        for i in range(0, len(self.lines)-1):
            str += "{}, ".format(self.lines[i])
        str += "{}}};".format(self.lines[i+1])
        str += "\nPlane Surface({}) = {{{}}};\n".format(self.number+1, self.number)
        filename = stl_to_geo_name(sys.argv[1])
        by = str.encode(encoding='UTF-8')
        with open(filename, "ab") as f:
            f.write(by)
        #print(str)


def get_vertices(source):
    filename = stl_to_geo_name(sys.argv[1])
    string = "lc = 40;\n"
    by = string.encode(encoding='UTF-8')
    with open(filename, "ab") as f:
        f.write(by)
    all_vertices, vector = get_all_vertices(source, 1)
    vertices = []
    counter = 1

    for vertex in all_vertices:
        if point_not_already_exist(vertices, vertex):
            vertex.set_number(counter)
            counter += 1
            vertices.append(vertex)
            vertex.display()
    return vertices, vector

def get_all_vertices(source, vector_also):
    vertices = []
    vector = []

    for line in source:
        data = line.rstrip("\n\r")
        data_split = data.split(" ")
        data_split[0] = data_split[0].strip()

        if data_split[0] == "vertex":
            vertex = Point(data_split[1], data_split[2], data_split[3])
            vertices.append(vertex)
        elif data_split[0] == "facet" and vector_also == 1:
            vertex = Point(data_split[2], data_split[3], data_split[4])
            vector.append(vertex)
    source.close()
    if vector_also == 1:
        return vertices, vector
    else:
        return vertices

def point_not_already_exist(vertices, point):
    test = True
    for p in vertices:
        if p == point:
            test = False
    return test


def get_edges(source, vertices):
    all_edges = get_all_edges(source, vertices)
    edges = []
    counter = 1

    for edge in all_edges:
        if check_if_line_not_exists(edges, edge):
            edge.number = counter
            counter += 1
            edges.append(edge)
    for edge in edges:
        edge.display()
    return edges

def get_all_edges(source, vertices):
    all_vertices = get_all_vertices(source, 0)
    edges = []

    while len(all_vertices) != 0:
        for i in range(1, 4):
            p1 = all_vertices[i - 1]
            if i == 3:
                p2 = all_vertices[0]
            else:
                p2 = all_vertices[i]

            edge = Line(search_a_class_number(vertices, p1), search_a_class_number(vertices, p2))
            edges.append(edge)
        count = 0
        while count != 3:
            vertex = all_vertices[0]
            all_vertices.remove(vertex)
            count += 1
    source.close()
    return edges


def search_a_class_number(tab, current):
    for elem in tab:
        if elem == current:
            return elem.number

def search_a_class_by_number(tab, number):
    for elem in tab:
        if elem.number == number:
            return elem


def check_if_line_not_exists(edges, current_edge):
    for edge in edges:
        if edge.p1 == current_edge.p1 and edge.p2 == current_edge.p2:
            return False
        elif edge.p1 == current_edge.p2 and edge.p2 == current_edge.p1:
            return False
    return True

def faces_define(all_edges, vector, edges):
    vector_count = same_vector_count(vector)
    count = 0
    edges_length = len(edges)
    number = edges[edges_length-1].number+1
    for i in vector_count:
        face = Face(number)
        face_line_number_tab = []
        for j in range(0, i):
            three_time = 0
            while three_time != 3:
                edge_number = search_a_class_number(edges, all_edges[count])
                if not(edge_number in face_line_number_tab):
                    face_line_number_tab.append(edge_number)
                else:
                    face_line_number_tab.remove(edge_number)
                count += 1
                three_time += 1
        l1 = search_a_class_by_number(edges, face_line_number_tab[0])
        face.lines.append(l1.number)
        menos_bool = 0
        while len(face_line_number_tab) != 1:
            for k in range(1, len(face_line_number_tab)):
                l2 = search_a_class_by_number(edges, face_line_number_tab[k])
                if l1.p2 == l2.p1 and menos_bool == 0:
                    face.lines.append(l2.number)
                    face_line_number_tab.remove(l1.number)
                    l1 = l2
                    swap(face_line_number_tab, 0, k - 1)
                    break
                elif l1.p2 == l2.p2 and menos_bool == 0:
                    face.lines.append(-l2.number)
                    face_line_number_tab.remove(l1.number)
                    l1 = l2
                    swap(face_line_number_tab, 0, k - 1)
                    menos_bool = 1
                    break
                elif l1.p1 == l2.p1 and menos_bool == 1:
                    face.lines.append(l2.number)
                    face_line_number_tab.remove(l1.number)
                    l1 = l2
                    swap(face_line_number_tab, 0, k - 1)
                    menos_bool = 0
                    break

                elif l1.p1 == l2.p2 and menos_bool == 1:
                    face.lines.append(l2.number)
                    face_line_number_tab.remove(l1.number)
                    l1 = l2
                    swap(face_line_number_tab, 0, k - 1)
                    break
        face.display()
        number += 2

def swap(tab, i1, i2):
    temp = tab[i1]
    tab[i1] = tab[i2]
    tab[i2] = temp


def same_vector_count(vector):
    counter = 1
    i = 0
    result = []
    while True:
        v = vector[i]
        for j in range(i+1, len(vector)):
            if vector[j] == v:
                counter += 1
            else:
                result.append(counter)
                counter = 1
                i = j
                break
        if i == len(vector)-2:
            if vector[i] == vector[i+1]:
                counter += 1
            result.append(counter)
            break
    return result


if __name__ == '__main__':
    filename = sys.argv[1]
    source = open(filename, "r")
    vertices, vector = get_vertices(source)
    source = open(filename, "r")
    edges = get_edges(source, vertices)
    source = open(filename, "r")
    all_edges = get_all_edges(source, vertices)
    faces_define(all_edges, vector, edges)
