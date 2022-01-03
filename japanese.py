# -*- coding: utf-8 -*-
#sys.stdout = codecs.getwriter('utf_8')(sys.stdout)
#sys.stdin = codecs.getreader('utf_8')(sys.stdin)


print("こんにちは")
print ("%s で %s " % (u"パイソン", u"自然言語処理"))

import re, pprint
def pp(obj):
    pp = pprint.PrettyPrinter(indent=4, width=160)
    str = pp.pformat(obj)
    return re.sub(r"\\u([0-9a-f]{4})", lambda x: unichr(int("0x"+x.group(1),
                                                           16)), str)

data = {
    u"スクリプト言語":
        {u"Perl": u"パール",
         u"Python": u"パイソン",
         u"Ruby": u"ルビー"},
    u"関数型言語":
        {u"Erlang": u"アーラング",
         u"Haskell": u"ハスケル",
         u"Lisp": u"リスプ"}
        }
